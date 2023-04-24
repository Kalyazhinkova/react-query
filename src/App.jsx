import React from "react";
import axios from "axios";
import { Container, Button, Form } from "react-bootstrap";
import { CoinsTable } from "./CoinsTable";
import { useMutation, useQuery, useQueryClient } from "react-query";

//функция для запроса на сервер
async function fetchProducts() {
  return (await axios.get(`https://63fa69b9897af748dccebef2.mockapi.io/items`))
    .data;
}

//функция для создания продукта
async function createProduct(data) {
  return axios.post("https://63fa69b9897af748dccebef2.mockapi.io/items", data);
}

function App() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery("products", fetchProducts);

  //первым параметром передаем анонимную функцию, которая вызывает функцию, отвечающую за создания продукта
  //вторым параметром передаем хук useQueryClient, который обновляет страницу, в случае успеха, ключ тот же как и при получении списка продуктов
  const mutation = useMutation((newProduct) => createProduct(newProduct), {
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  if (isLoading) {
    return <h3>Идет загрузка...</h3>;
  }

  if (isError) {
    return <h3>Ошибка при получении данных</h3>;
  }

  if (!data) {
    return <h3>Нет данных</h3>;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target); //вытаскиваем инпуты
    const fields = Object.fromEntries(formData); //значение инпутов превращает в объект
    mutation.mutate(fields); //отправляем запрос на сервер
    event.target.reset(); //после того как данные получены - очищаем форму
  };

  return (
    <Container style={{ marginTop: 30, maxWidth: 600 }}>
      <CoinsTable data={data} />
      <hr />
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Control name="name" type="text" placeholder="Название" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control name="price" type="number" placeholder="Цена" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </Container>
  );
}

export default App;
