import React, { Component } from "react";
import products from "./Product";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      inputvalue: ''

    }
  }
  componentDidMount() {
    this.setState({ products })
  }

  searchProduct = (value) => {
    this.setState({ inputvalue: value })
  }

  clickHandler = () => {
    console.clear()

    // const url = `https://www.digikala.com/search/?q=${this.state.inputvalue}`
    const url = `https://www.digikala.com/ajax/autosuggest/?q=${this.state.inputvalue}`

    fetch(url).then(
      res => res.json()
    ).then(
      data => {
        const list = data.data.suggestion_products.map(item => {
          return {
            title: item.title,
            price: '$20000',
            imageURL: item.image
          }
        })
        this.setState({ products: list })
      }
    )


    //   fetch(url).then(
    //     res => { return res.text() }
    //   ).then(
    //     data => {
    //       const doc = document.createElement('html');
    //       console.log(data.includes('c-product-box'))
    //       doc.innerHTML = data;
    //       const ProductArray = [...doc.querySelectorAll('.c-product-box')]
    //         .filter(item => !!item && !!item.getAttribute('data-enhanced-ecommerce'));
    //       const list = ProductArray.map(htmlElement => {
    //         const ecommerceData = JSON.parse(htmlElement.getAttribute('data-enhanced-ecommerce'));
    //         const imgElement = htmlElement.querySelector('img');
    //         const imageURL = imgElement.getAttribute('src')
    //         return {
    //           title: ecommerceData.name,
    //           price: ecommerceData.price,
    //           imageURL
    //         }
    //       })
    //       this.setState({ products: list })
    //     }
    //   )

  }
 
  render() {

    return (
      <>
        <div className="head">
        <div className="circle maincircle"></div>
        <span className="circle2 minicircle"></span>
          <div className="header">
            <h3 className="catalogheader">Product catalog</h3>
          </div>
          <div className="search">
            <label htmlFor="search">search:</label>
            <input type="text" id="search" name="search" placeholder="search here..." value={this.state.inputvalue}
              onChange={(event) => { this.setState({ inputvalue: event.target.value }) }} />
            <button onClick={this.clickHandler} className="search-btn"><FontAwesomeIcon icon={faSearch} /></button>
            <br></br>
          </div>
        </div>
        <div className="main">
          {
            this.state.products.map((item, i) => {
              console.log('item: ', item);
              return (
                <div className="big">
                  <div className="container">
                    <div className="image">
                      <img className="img" src={item.imageURL} width={200} height={200} />
                    </div>
                    <div className="info">
                      <h5 className="title">{item.title}</h5>
                      <h4 className="price">{item.price}</h4>
                    </div>
                    <div>
                      <span class="foot"><span className="iconbag"><FontAwesomeIcon icon={faShoppingBag} /></span>BUY</span>
                      <span class="foot mr-50"><span className="iconcart"><FontAwesomeIcon icon={faShoppingCart} /></span>ADD TO CARD</span>
                    </div>
                  </div>
                </div>

              )
            })
          }
        </div>
        <svg viewBox="0 0 1440 320"><path fill="#a2d9ff" fill-opacity="2" d="M0,160L30,170.7C60,181,120,203,180,224C240,245,300,267,360,266.7C420,267,480,245,540,250.7C600,256,660,288,720,293.3C780,299,840,277,900,256C960,235,1020,213,1080,208C1140,203,1200,213,1260,224C1320,235,1380,245,1410,250.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
      </>

    )

  }
}
export default App;
