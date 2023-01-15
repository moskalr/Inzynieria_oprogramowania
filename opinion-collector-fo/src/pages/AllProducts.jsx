import React, { useCallback, useEffect, useState } from 'react';
import Product from '../common/components/ProductTile/Product';
import Footer from '../common/layouts/components/Footer/Footer';
import { putProductHidden } from '../api/productApi';
import css from './AllProducts.module.scss';
import {
  getProducts,
  getProductsVisivle as getProductsVisible
} from '../api/productApi';
import { useClient } from '../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const { clientRole } = useClient();
  const navigate = useNavigate();

  const findProducts = useCallback(async () => {
    let response;

    if (clientRole == 'ADMIN') {
      response = await getProducts();
    } else {
      response = await getProductsVisible();
    }

    if (response[1] === 200) {
      setProducts(response[0]);
    } else {
      //toast ?
      console.log('Ni ma produktów');
    }
  }, [clientRole]);

  useEffect(() => {
    findProducts();
  }, [findProducts, query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const handleProductHide = async (id) => {
    const productsToUpdate = [...products];
    const indexOfProductToHide = productsToUpdate.findIndex(
      (product) => product.productId === id
    );
    if (indexOfProductToHide !== -1) {
      console.log(indexOfProductToHide);
      productsToUpdate[indexOfProductToHide].hidden =
        !productsToUpdate[indexOfProductToHide].hidden;
      setProducts(productsToUpdate);
    }
    await putProductHidden(id);
  };

  const handleProductEdit = async (idPr) => {
    const id = idPr;
    const productToUpdate = [...products];
    const indexOfProductToEdit = productToUpdate.findIndex(
      (product) => product.id === idPr
    );
    if (indexOfProductToEdit !== -1) {
      setProducts(productToUpdate);
    }
    navigate(`/products/edit/${id}`);
  };

  const handleSuggestChanges = async (id) => {};

  return (
    <div className="products">
      <div className={css.productsNavs}>
        <form onSubmit={getSearch} className={css.searchForm}>
          {clientRole === 'ADMIN' && (
            <Link style={{ marginRight: '10vw' }} to="/products/add">
              <button className={css.addProductButton}>Add product</button>
            </Link>
          )}
          <input
            className={css.searchBar}
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className={css.searchButton} type="submit">
            Search
          </button>
        </form>
      </div>

      <div className={css.products}>
        {products.map((product) => (
          <Product
            key={product.id}
            handleProductHide={() => handleProductHide(product.productId)}
            handleProductEdit={() => handleProductEdit(product.id)}
            title={product.title}
            image={product.image}
            description={product.title}
            id={product.id}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllProducts;
