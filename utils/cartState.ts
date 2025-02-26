// utils/localStorage.ts
export const loadCartState = () => {
    try {
      const serializedState = localStorage.getItem('cartState');
      if (serializedState === null) {
        return undefined; // Return undefined to use the initial state
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load cart state", err);
      return undefined; // Return undefined to use the initial state in case of error
    }
  };
  
  export const saveCartState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('cartState', serializedState);
    } catch (err) {
      console.error("Could not save cart state", err);
    }
  };
  