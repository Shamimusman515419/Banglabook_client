import { useRef, useState } from "react";

export function MyComponent() {

     const [inputValue, setInputValue] = useState('');

     const handleSubmit = (event) => {
          event.preventDefault();
          // Handle form submission logic here
          console.log('Form submitted:', inputValue);
          setInputValue('');
     };

     const handleChange = (event) => {
          setInputValue(event.target.value);
     };

     return (
          <form onSubmit={handleSubmit}>
               <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
               />
               <button type="submit">Submit</button>
          </form>
     );
}