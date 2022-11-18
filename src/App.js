import React,{useState, useEffect} from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";


function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(()=>{
    const getData = async () => {
      const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`)
      const data = await response.json();

      setImages(data.hits)
      setLoading(false)
    }
    getData();
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text)=>setTerm(text)} />

      {!loading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">
          No Images Found!
        </h1>}

      {loading? 
        <h1 className="text-6xl text-center mx-auto mt-32">
          loading...
        </h1>
        : 
        <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
      }
    </div>
  );
}

export default App;
