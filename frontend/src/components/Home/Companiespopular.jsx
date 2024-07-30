import React from 'react'
import '../../Css/CompaniesPopular.css'

const Companiespopular = () => {

    const element = [
        {
            id : 1,
            name : "Amazon",
            locations : "Bangalore,India",
            icon : "/images/amazon.jpg"
        },
        {
            id : 2,
            name : "Apple",
            locations : "Pune,India",
            icon : "/images/apple.png"
        },
        {
            id : 3,
            name : "Microsoft",
            locations : "Bangalore,India",
            icon : "/images/microsoft.webp"
        },
        {
            id : 4,
            name : "Gupsup",
            locations : "Bangalore,India",
            icon : "/images/gupsup.png"
        },
        {
            id : 5,
            name : "Google",
            locations : "Hydrabad,India",
            icon : "/images/google.jpg"
        },
        {
            id : 7,
            name : "ZS Associates",
            locations : "Kolkata,India",
            icon : "/images/zs.jpg"
        },
        {
            id : 8,
            name : "Morgan Stanley",
            locations : "Bangalore,India",
            icon : "/images/morgan-stanley.png"
        },
        {
            id : 9,
            name : "Schorindger",
            locations : "Kolkata,India",
            icon : "/images/Schorindger.png"
        }
    ]
  return (
    <>
        <div className = "companies-details">
            <div className = "companies">
                <div className = "heading">PopularCompanies</div>
                <div className = "banner">
                    {element.map((ele)=>{
                        return(
                            <div className = "card" key={ele.id}>
                                <div className = "icon-images"><img src = {ele.icon} alt = "image"/></div>
                                <div className = "texts">
                                    <div className="firstp">{ele.name}</div>
                                    <div className = "secondp">{ele.locations}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default Companiespopular