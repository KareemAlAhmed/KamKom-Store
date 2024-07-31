import SideBarFilter from '../../components/resultsFilterSideBar/SideBarFilter';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import "./ResultsPage.css"
import ResultsContainer from '../../components/resultsContainer/ResultsContainer';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
export default function ResultsPage() {
    const page = useParams()?.item;
    const subpage = useParams()?.subitem;
  return (
    <> 
        <Navbar />
            <div className="flex wrapper sideBar">
            <SideBarFilter />
            <ResultsContainer for={page} subitem={subpage}/>
            </div>
            <ToastContainer />
        <Footer />
    </>
  )
}
