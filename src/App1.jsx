//образец загрузки данных с сервера с помощью react-query

import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { CoinsTable } from "./CoinsTable";
import { useQuery } from "react-query";

//функция для запроса на сервер
async function fetchCoins(skip = 0) {
  const { data } = await axios.get(
    `https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=10`
  );
  return data.coins;
}

function App() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useQuery(
    ["coins", page],
    () => fetchCoins(page),
    //первая настройка кэширует данные и использует их до тех пор, пока не загрузятся новые
    //вторая настройка позволяет не переобновлять данные при смене фокуса
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return <h3>Идет загрузка...</h3>;
  }

  if (isError) {
    return <h3>Ошибка при получении данных</h3>;
  }

  if (!data) {
    return <h3>Нет данных</h3>;
  }

  return (
    <Container style={{ marginTop: 30, maxWidth: 600 }}>
      <CoinsTable data={data} />
      <Button onClick={() => setPage((p) => p - 10)} disabled={!page}>
        Назад
      </Button>
      <Button onClick={() => setPage((p) => p + 10)}>Далее</Button>
    </Container>
  );
}

export default App;
