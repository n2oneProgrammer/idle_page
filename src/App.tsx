import './App.css';
import {
    createBrowserRouter, RouterProvider,
} from "react-router-dom";
import React from "react";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/main";
import DotLineWatchingPage from "./pages/dot_line_watching";
import FurierSeriesPage from "./pages/furier_series";

const router = createBrowserRouter([
    {
        path: "/idle_page",
        element:
            <Layout><MainPage></MainPage></Layout>,
    },
    {
        path: "/idle_page/square",
        element:
            <Layout><DotLineWatchingPage></DotLineWatchingPage></Layout>
    },
    {
        path: "/idle_page/furier",
        element:
            <Layout><FurierSeriesPage></FurierSeriesPage></Layout>
    },
    {
        path: "*",
        element: <div>Not Found</div>
    }
]);

function App() {

    return (
        <RouterProvider router={router}/>
    )
}

export default App;
