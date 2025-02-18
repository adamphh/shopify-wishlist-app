import { json } from '@remix-run/node'; // or cloudflare/deno

export async function loader({ request }) {
    // provides data to the component

    return json({ ok: true, message: 'Hello from the API' })
}

// export default function Component() {
//     // renders the UI
// }

export async function action({ request }) {
    // updates persistent data
    const method = request.method;

    console.log(method);

    switch (method) {
        case 'GET':
            return json({ ok: true, message: 'Api using Get method', method: method });
        case 'POST':
            return json({ ok: true, message: 'Api using Post method', method: method });
        case 'PUT':
            return json({ ok: true, message: 'Api using Put method', method: method }); //
        case 'DELETE':
            return json({ ok: true, message: 'Api using Delete method', method: method }); //
        default:
            return new Response("Error: Unknown method", { status: 405 })
    }
}