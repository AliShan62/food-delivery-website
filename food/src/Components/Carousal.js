import Carousel from 'react-bootstrap/Carousel'; 
function Carousal() {
  return (
    <Carousel className="carousel slide carousel-fade">
      <Carousel.Item className="carousal ">
        <img src="" alt="first" />
        <Carousel.Caption>
            <form className="d-flex" role="search"> 
              <input className="form-control me-2" type="search" placeholder="Search Here" aria-label="Search" />
              <button className="btn bg-success text-white" type="submit">Search</button>
            </form>
        </Carousel.Caption> 
      </Carousel.Item>
      <Carousel.Item className="carousal">
        <img src="" alt="second" />
        <Carousel.Caption>
             <form className="d-flex " role="search">
              <input className="form-control me-2" type="search" placeholder="Search Here " aria-label="Search" />
              <button className="btn bg-success text-white" type="submit">Search</button>
            </form>
        </Carousel.Caption>
        
      </Carousel.Item>
      <Carousel.Item className="carousal">
        <img src="" alt="third" />
        <Carousel.Caption>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search Here" aria-label="Search" />
              <button className="btn bg-success text-white" type="submit">Search</button>
            </form>   
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousal;