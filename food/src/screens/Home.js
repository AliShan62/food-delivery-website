import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import foodCategory from '../Components/foodCategory.json';
import food_items from '../Components/food_items.json';
import Carousel from 'react-bootstrap/Carousel';



function Home() {
  const [search, setSearch] = useState("");
  
  // Filter the foodCategory based on the search criteria
  const filteredCategories = foodCategory.filter(category =>
    food_items.some(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="">
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel className="carousel slide carousel-fade">
        <Carousel.Item className="carousal ">
        <img src="https://www.thespruceeats.com/thmb/d3dydMavjnQGJh1dsCsPzNkkrB4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tikka-boti-kabobs-333771-Hero_01-ddffd2bce19a42138c26415446022280.jpg" alt="first" />
        <Carousel.Caption>
            <div className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search Here" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
              
            </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousal">
        <img src="https://www.unileverfoodsolutions.pk/dam/global-ufs/mcos/meps/pakistan/calcmenu/recipes/PK-recipes/chicken-&-other-poultry-dishes/chicken-tikka-boti/main-header.jpg/jcr:content/renditions/cq5dam.thumbnail.desktop.jpeg" alt="second" />
        <Carousel.Caption>
            
        </Carousel.Caption>
        
      </Carousel.Item>
      <Carousel.Item className="carousal">
        <img src="https://hamariweb.com/recipes/images/recipeimages/11871.jpg" alt="third" />
        <Carousel.Caption>
             
        </Carousel.Caption>
      </Carousel.Item>

        </Carousel>
      </div>
      <div className="">
        {filteredCategories.map((category, index) => (
          <div key={index} className="select">
            <div className="row mt-5 goodWork">
              <div className="col text-white">
                <h2>{category.CategoryName}</h2>
                <hr style={{"width":"90%"}}/>
              </div>
            </div>
            <div className="row goodWork">
              {food_items
                .filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map((item, index) => (
                  <div
                    key={index}
                    className="mb-5 col-sm-12 col-md-4 col-lg- col-12"
                  >
                    <Card food_items={item} options={item.options[0]}/>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
