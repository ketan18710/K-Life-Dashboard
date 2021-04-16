import React,{useEffect} from 'react'
import './style.scss'
import {DEFAULT_IMAGE_1,APP_ROUTES} from 'utils/constants'
import {redirectToUrl} from 'utils/common'
import {Card4 as Card} from 'components/Cards/index'

function DisplayProducts(props) {
  const {description,title,products,category_slug,sub_category_slug} = props
  const createTable = () => {
    let rows =[] ;
    let row = [];
    let columns = 0;
    {
      // row = 0
      products.map((product,index)=>
        { 
          row.push(
            <td className="product">
              <Card
                image={product.images.length>=0 ?  product.images[0] : DEFAULT_IMAGE_1}
                title={product.title}
                model={product.model_id}
                action={()=>redirectToUrl(APP_ROUTES.PRODUCT_ALIAS(category_slug,sub_category_slug,product.model_id))}
              />
            </td>
          )
          if(columns === 2 || index === (products.length-1)){
            // debugger
            rows.push(
              <tr>
                {
                  row
                }
              </tr>
            )
            columns =0;
            row = []
          }else{
            columns ++
          }
        } 
      )
      return rows
    }
  }
  return (
    <div className="displayProducts">
      <h3 className="title">B.P. Monitor</h3>
      <h5 className="description">Dolore Lorem proident sint adipisicing irure eu velit pariatur fugiat elit. Mollit deserunt anim labore est est quis. Consequat esse occaecat consectetur non quis consequat.</h5>
      <div className="products">
        {
          products.map((product,index)=>
            <div className="product">
              <Card
                image={product.images.length>=0 ?  product.images[0] : DEFAULT_IMAGE_1}
                title={product.title}
                model={product.model_id}
                action={()=>redirectToUrl(APP_ROUTES.PRODUCT_ALIAS(category_slug,sub_category_slug,product.model_id))}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default DisplayProducts
