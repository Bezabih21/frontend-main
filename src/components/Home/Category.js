import React from 'react'

export default function Category({categories, setCategory}) {
    return (
        <div>
            
            <nav id="sidebar">
        
          <ul className="nav nav-pills  nav-sidefeatures">
            <div className="col-lg-41">
            {categories.map((category, i) => {
               return( <li key={category._id}>
                    <p className="text-primary"   onClick={() => setCategory(category._id)}><span className={category.fa_icon} ></span> {category.name}</p>
                </li>)
            })}
            
            
         
        </div>
        </ul>
        
            </nav>
          
        
        </div>
    )
}
