import 'dotenv/config';
import { app } from './app.js';

const url = process.env.NEXT_PUBLIC_FRONT_END_URL ?? "http://localhost";
const port = process.env.NEXT_PUBLIC_BACK_END_PORT ?? 3001;

app.listen(port, () => {
    console.log(`${url}:${port} \n`);
    console.log(`Server listening on port ${port}`);
});