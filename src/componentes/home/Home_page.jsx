import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from '../header/Header.jsx';
import Card from '../cards/Cards_home.jsx';
import itemsLoja from '../data/itemsLoja.json';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import rootReducer from '../../redux/root-reducer.js';
import CartItem from '../cartItem/CartItem.jsx';
import { selectProductsTotalPrice } from '../../redux/cart/cart.selector.js';
import Footer from '../footer/Footer.jsx';

function Home_Page() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(itemsLoja);
    }, []);

    const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

    const productsTotalPrice = useSelector(selectProductsTotalPrice);

    return (
        <>
            <Header></Header>
            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvas" /*Parece muito ruim, mas tá bom */>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLabel">Itens no Carrinho</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column gap-3" /*Itens no carrinho */>
                    {products.map(product => 
                        <CartItem key={product.id} product={product}/>
                    )}
                    <div className="container-fluid d-flex justify-content-between">
                        <h4>Total</h4>
                        <h5>R$ {productsTotalPrice}</h5>
                    </div>
                    <Link to = "/pedido">
                        <span className="btn btn-brick-red w-100">Confirmar</span>
                    </Link>
                </div>
            </div>
            <div className="bg-banana-mania py-4 px-2">
                <main>
                    <section className="container-fluid m-0">
                        <h2 className="mb-4 text-left">Loja</h2>
                        <div className="row g-3">
                            {items.map((item) => (
                                <div key="item.id" className="col-md-4 col-lg-3 d-flex">
                                    <Card /*Notação de merda */ {...item} />
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
            <Footer></Footer>
        </>
    );
}
export default Home_Page;