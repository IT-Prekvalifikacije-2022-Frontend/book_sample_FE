import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ShowBooks from './book/ShowBooks';
import ShowAuthors from './author/ShowAuthors';
import ShowGenres from './genre/ShowGenres';
import NewGenre from './genre/NewGenre';
import NewAuthor from './author/NewAuthor';
import NewBook from './book/NewBook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'books',
        element: <ShowBooks/>,
        loader: async() => {
          return fetch('http://localhost:8080/api/v1/book');
        }
      },
      {
        path: 'authors',
        element: <ShowAuthors/>,
        loader: async() => {
          return fetch('http://localhost:8080/api/v1/author');
        }
      },
      {
        path: 'genres',
        element: <ShowGenres/>,
        loader: async() => {
          return fetch('http://localhost:8080/api/v1/genre');
        }
      },
      {
        path:'genres/add_new',
        element: <NewGenre/>
      },
      {
        path:'authors/add_new',
        element: <NewAuthor/>
      },
      {
        path:'books/add_new',
        element: <NewBook/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
