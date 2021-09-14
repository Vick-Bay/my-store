import productService from "../../services/product.service";
import ShopActionTypes from "./shop.types";
import toast from "react-hot-toast";

export const fetchCollectionsStart = () => async (dispatch) => {
  try {
    dispatch({ type: ShopActionTypes.FETCH_COLLECTIONS_START });
    const response = await productService.getProducts(1, 20);
    dispatch(fetchCollectionsSuccess(response.data));
  } catch (error) {
    dispatch(fetchCollectionsFailure());
    toast.error("Failed to get shop items ");
  }
};

export const fetchCollectionsSuccess = (collections) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collections,
});

export const fetchCollectionsFailure = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
});

//redux thunk code
// export const fetchCollectionsStartAsync = () => {
//   return (dispatch) => {
//     const collectionRef = firestore.collection("collections");

//     collectionRef
//       .get()
//       .then((snapshot) => {
//         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//         dispatch(fetchCollectionsSuccess(collectionsMap));
//       })
//       .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
//   };
// };
