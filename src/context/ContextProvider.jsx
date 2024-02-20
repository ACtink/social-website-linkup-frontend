





import React, { createContext } from 'react';

// Step 1: Create a context
const MyContext = createContext();

// Step 2: Create a provider component
// const ContextProvider = ({ children }) => {
//   const [user, setUser] = useState('initialValue');

//   return (
//     <MyContext.Provider value={{ user, setUser }}>
//       {children}
//     </MyContext.Provider>
//   );
// };


export default MyContext
