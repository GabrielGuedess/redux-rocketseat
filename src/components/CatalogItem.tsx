import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';

interface ICatalogItem {
  product: IProduct;
}

const CatalogItem = ({ product }: ICatalogItem) => {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>(state =>
    state.cart.failedStockCheck.includes(product.id)
  );

  const handleAddProduct = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article>
      <strong>{product.title}</strong> {' - '}
      <span>{product.price}</span> {'  '}
      <button type='button' onClick={handleAddProduct}>
        Comprar
      </button>

      {hasFailedStockCheck && (
        <span style={{ color: 'red' }}>Produto fora de estoque</span>
      )}
    </article>
  );
};

export default CatalogItem;
