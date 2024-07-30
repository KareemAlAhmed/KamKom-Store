
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FETCH_CATEGORY_PRODS, FETCH_CATEGORY_RANDOM_PRODS, FETCH_HOTDEALS_PRODS, FETCH_LATEST_PRODS } from '../../../redux/product/productAction';

export default function NavItem(props) {
    const btnGroupDropdownElements = document.querySelectorAll(".MenuItem ");

  const dispatch=useDispatch();
    btnGroupDropdownElements.forEach(element => {
      element.addEventListener("mouseenter", () => {
        const dropdownMenu = element.querySelector(".dropdown-menu");
    

        if (dropdownMenu) {
          dropdownMenu.classList.add("open"); // Use classList for modern approach
          dropdownMenu.style.opacity = 0; // Set initial opacity for smooth fade-in
          dropdownMenu.classList.remove("hidden"); // Avoid potential display issues
    
          dropdownMenu.addEventListener("transitionend", () => {
            if (dropdownMenu.classList.contains("open")) {
              dropdownMenu.style.opacity = 1; // Set final opacity after transition
            }
          });
        }
      });
    
      element.addEventListener("mouseleave", () => {
        const dropdownMenu = element.querySelector(".dropdown-menu");
        if (dropdownMenu) {
          dropdownMenu.classList.remove("open");
          dropdownMenu.style.opacity = 1; // Set initial opacity for smooth fade-out
          dropdownMenu.addEventListener("transitionend", () => {
            if (!dropdownMenu.classList.contains("open")) {
              dropdownMenu.style.opacity = 0; // Hide menu after transition
              dropdownMenu.classList.add("hidden"); // Optionally hide for better accessibility
            }
          });
        }
      });

    });
    let list=[
      {
        id:9,
        name:"Furniture",
        menu:["Coffee Tables","Storages","Master Bedroom Sets","Office Living","Office Chairs","Kids & Single Beds","Fabric Sofas","Master Beds","Dining Tables"]
      },
      {
        id:2,
        name:"Computer-Parts",
        menu:["Computer Components","Data and Storage","RAM","System Cooling","CPU","Motherboards","VGA","Power Supply","Case"]
      },
      {
        id:8,
        name:"Fashion",
        menu:["Samba Og Sneakers","T-Shirt","Sneakers","Hoodie","Sweatshirt","Rain Boots","Boots","Logo Polo Shirt","Short Sleeve Tshirt","Jeans"]
      },
      {
        id:5,
        name:"Mobile",
        menu:["Apple","Samsung","Tecno","CAT","Umidigi","Xiaomi","Blackview","Nokia","Infinix","Honor"]
      },
      {
        id:6,
        name:"Tablet",
        menu:["Samsung","itel","Blackview","Xiaomi","Doogee","Amazon","reMarkable","UGEE","Wacom","Apple","CCIT"]
      },
      
      {
        id:7,
        name:"Networking",
        menu:["Fiber and Passive","Business and Enterprise","Home and Small Office","VOIP and PBX","Router"]
      },
      {
        id:1,
        name:"Laptops",
        menu:["Dell","Lenovo","Asus","HP","Acer","Microsoft","Samsung"]
      },
      {
        id:3,
        name:"Desktops",
        menu:["Intel", "Asus","HP" ,"Lenovo" ,"Acer" ,"Gigabyte"]
      },
      {
        id:11,
        name:"Property",
        menu:["Building","Villa","Apartment","Duplex"]
      },
    ]
    const newNavigation=(Index,event)=>{

      event.stopPropagation();
      dispatch(FETCH_CATEGORY_PRODS(Index))
      sessionStorage.getItem("currentFiler") == null ? null : sessionStorage.removeItem("currentFiler")
      sessionStorage.setItem("intendentValue",Index)
    }
    const getSectionProds=(type)=>{

      switch(type){
          case "Categories":
            dispatch(FETCH_CATEGORY_RANDOM_PRODS())
            sessionStorage.getItem("currentFiler") == null ? null : sessionStorage.removeItem("currentFiler")
            break;
            case "Latest":
              dispatch(FETCH_LATEST_PRODS())
              sessionStorage.getItem("currentFiler") == null ? null : sessionStorage.removeItem("currentFiler")
              break;
            case "Hot Deals":
              dispatch(FETCH_HOTDEALS_PRODS())
              sessionStorage.getItem("currentFiler") == null ? null : sessionStorage.removeItem("currentFiler")
              break;
          default:
            return null;
      }
    }
  
  return (  
      props.dropMenu   ?
      <Link to={"/"+props.to +"/results"} className="MenuItem" onClick={event=>getSectionProds(props.type,event)}>
      <div className="btn btn-primary dropdown-toggle" id="dLabel" role="button" data-toggle="dropdown" >{props.type}</div>
        <ul className="dropdown-menu mainMenu" role="menu" aria-labelledby="dropdownMenu">
        {
          
          list.map((e)=>{
            return(
              // <li key={Index}><a className="dropdown-item" href="#">{e.name}</a></li>
              <li className="dropdown-submenu" key={e.id} onClick={(event)=>newNavigation(e.id,event)}>
                
                <Link to={"/"+props.to +"/"+e.name+"/results/"} onClick={(event)=>newNavigation(e.id,event)} className="dropdown-item" tabIndex="-1" href="#" >
                    {e.name}
                  </Link>
                  <ul className="dropdown-menu">
                      {
                        e.menu.map((j)=>{
                          return <li key={j} className='subitem'><a className="dropdown-item" tabIndex="-1" href="#">{j}</a></li>

                        })
                      }
                  </ul>
              </li>
            )
          })
        }
                                
    </ul>
  </Link>
  : 
  <Link to={props.to == "Home"? "/" :"/"+props.to+"/results"} className="MenuItem" onClick={event=>getSectionProds(props.type,event)}>
  <div className="btn btn-primary dropdown-toggle" id="dLabel" role="button" data-toggle="dropdown" >{props.type}</div>
      </Link>

  )
}
