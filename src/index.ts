import express, { Express, Request, Response } from 'express';
import { isCreateCatRequest } from './features/cat';

const app: Express = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

// ねこを登録するAPI http://localhost:3000/cats
app.post('/cats', (req: Request, res: Response) => {
  // 先程作成した isCreateCatRequest を使って型判定を行う
  if (isCreateCatRequest(req.body)) {
    // このブロックでは req.body は CreateCatRequest型 と型推論されます
    const body = req.body;

    // idについては実際にはデータベースに登録した値を使う事になると思うがサンプルコードなので固定値を返している
    return res.status(201).json({ id: 6, name: body.name, breed: body.breed });
  }

  // ここに到達するという事はリクエストBodyが正しくない
  res.status(400).json({ title: 'BadRequest' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
