import express from 'express';
import bodyParser from 'body-parser';


export class Api {

    public static Start () {

        const components = [
            { id: "1", class: "valve", desc: "Gate Valve", name: "V-100"},
            { id: "2", class: "pump", desc: "Centrigual Pump", name: "P-100"},
            { id: "3", class: "tank", desc: "Horizontal Tank", name: "T-100"},
        ];

        const findComponent = (id: string) => {
            let index = -1;
            let currIndex = 0;
            for ( const comp of components) {
                if (comp.id === id) {
                    index = currIndex;
                    break;
                }
                currIndex++;
            }
            return index;
        }

        const api = express();

        api.use(bodyParser.json()); // support json encoded bodies
        api.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



        api.get('/api', (req, res) => {
            return res.send('Hello from our API');

        });

        api.get('/api/components', (req, res) => {
            return res.json(components);
        });

        api.get('/api/components/:id', (req, res) => {
            let index = findComponent(req.params.id);
            if (index > -1) {
                return res.json(components[index]);
            }
            return res.sendStatus(404);
        });

        api.post('/api/components', (req, res) => {
            components.push({
                id: req.body.id,
                class: req.body.class,
                name: req.body.name,
                desc: req.body.desc
            });
            return res.sendStatus(201);

        });

        api.delete('/api/components/:id', (req, res) => {
            //return res.send(`should delete comp with id = ${req.params.id}`);
            let index = findComponent(req.params.id);
            if (index > -1) {
                components.splice(index, 1);
                return res.sendStatus(200);
            }
            return res.sendStatus(404);


        });

        const port = process.env.PORT || 3000;

        api.listen(port, () => {
            console.log(`api is listening on  http://localhost:${port}`);
        });


    }
}
