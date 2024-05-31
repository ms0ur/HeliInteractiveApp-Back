import { createUser, isUserExists } from "../../util/user.util";

export const createUserController = async (req, res) => {
    if (await isUserExists(req.body.nickname)) {
        res.status(400).send("User already exists");
        return;
    }
    const user = await createUser(req.body);
    res.status(200).send(user);
}