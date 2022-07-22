import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { addProduct } from '../actions/productActions';
import Axios from 'axios';

export default function ProductCreateScreen(props) {
  const [name, setName] = useState('');
  const [seller, setSeller] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [rating, setRating] = useState('');
  const [numReview, setNumReview] = useState('');
  const [description, setDescription] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const createProduct = useSelector((state) => state.createProduct);
  const { productInfo, loading, error } = createProduct;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
      {
      dispatch(addProduct(name, seller, image, category, price, brand, countInStock, rating, numReview, description));      
      }
  };
  useEffect(() => {
    if (productInfo) {
      props.history.push('./productlist');
    }
  }, [props.history,productInfo]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Sanju ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Product</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="seller">Seller</label>
          <input
            type="text"
            id="seller"
            placeholder="Enter user name"
            required
            onChange={(e) => setSeller(e.target.value)}
          ></input>
        </div>
        <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="name">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Enter category"
            required
            onChange={(e) => setCategory(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            placeholder="Enter brand"
            required
            onChange={(e) => setBrand(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="countInstock">CountInStock</label>
          <input
            type="number"
            id="countInstock"
            placeholder="Enter CountInStock"
            required
            onChange={(e) => setCountInStock(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            placeholder="Enter rating"
            required
            onChange={(e) => setRating(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="numReview">NumReview</label>
          <input
            type="number"
            id="numReview"
            placeholder="Enter numReview"
            required
            onChange={(e) => setNumReview(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
