import { createRouter, H3Event, eventHandler } from "h3";
import * as fs from 'fs';
import * as path from 'path';
import markdownit from 'markdown-it';

const md = markdownit({ html: true });

interface IActiveRoutes {
    method: string;
    route: string;
    wikiRoute?: string;
}

const activeRoutes: IActiveRoutes[] = [];

async function importFromDirectory(directory: string, parentRoute: string): Promise<void> {
    console.log(`Importing from directory: ${directory}`);
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            const subRoute = parentRoute ? `${parentRoute}/${entry.name}` : entry.name;
            await importFromDirectory(fullPath, subRoute);
        } else if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts') {
            console.log(`Found route file: ${fullPath}`);
            const [method, routePart] = entry.name.split('_');
            if (!method || !routePart) {
                console.log(`Invalid route file: ${fullPath}`);
                continue;
            }
            console.log(`Found route: ${method} ${routePart}`);
            const route = parentRoute ? `${parentRoute}/${routePart.slice(0, -3)}` : routePart.slice(0, -3);
            const modulePath = path.resolve(fullPath);
            const wikiModulePath = path.resolve(fullPath.replace('.ts', '_wiki.ts'));

            try {
                const module = await import(modulePath);

                if (module && module.default && module.default.values) {
                    console.log(`Imported route: ${route}`);
                    activeRoutes.push({ method: method.toLowerCase(), route });
                    console.log(activeRoutes);
                    router[method.toLowerCase()](`/${route}`, eventHandler(module.default.values));
                }

                if (fs.existsSync(wikiModulePath)) {
                    const wikiModule = await import(wikiModulePath);

                    if (wikiModule && wikiModule.default && wikiModule.default.values) {
                        console.log(`Imported wiki route: ${route}`);
                        const wikiRoute = `/wiki/${route}`;
                        activeRoutes.find(r => r.route === route)!.wikiRoute = wikiRoute;
                        router.get(wikiRoute, eventHandler(wikiModule.default.values));
                    }
                }
            } catch (error) {
                console.error(`Failed to import ${fullPath}:`, error);
            }
        }
    }
}

const router = createRouter();

try {
    const directoryPath = path.resolve(__dirname);
    importFromDirectory(directoryPath, '');
} catch (error) {
    console.error('Error importing values:', error);
}

router.get("/routes", eventHandler((event: H3Event) => {
    const activeRoutesString = activeRoutes.map(route => `- \`${route.method.toUpperCase()} ${route.route}\`${route.wikiRoute ? `, [WIKI](${event.context.url}${route.wikiRoute})` : ''}`).join("\n");
    console.log(activeRoutesString);
    return md.render(`# Active routes:\n${activeRoutesString}`);
}));

router.get("/", eventHandler(() => {
    return md.render(`# Welcome to HeliInteractiveApp Backend!\n\nThis is a root page. You can find active routes in [ACTIVE ROUTES](/routes) section.`);
}));

router.get("/:routePath", eventHandler((event: H3Event) => {
    const routePath = event.context.params?.routePath;

    if (!routePath) {
        return md.render(`# Error\n\nNo route path provided.`);
    }

    const modulePath = path.resolve(__dirname, `routes/${routePath}/index.ts`);

    try {
        const module = require(modulePath);

        if (module && module.default && module.default.values) {
            return module.default.values;
        } else {
            return md.render(`# Error\n\nFailed to import ${modulePath}: module doesn't have default export or default export doesn't have 'values' field.`);
        }
    } catch (error) {
        console.error(`Failed to import ${modulePath}:`, error);
        return md.render(`# Error\n\nFailed to import ${modulePath}: ${error}`);
    }
}));

// Catcher for all service requests
router.get("/*", eventHandler((event: H3Event) => {
    return md.render(`# Service Request\n\nThe requested resource "${event.context.url}" is not available.`);
}));

export default router;
