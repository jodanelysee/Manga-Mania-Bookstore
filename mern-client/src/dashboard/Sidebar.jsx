
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

import dragonball from '../assets/dragonball.png'

export const SideBar = () => {
    const handleLogoClick = (event) => {
        event.preventDefault();
        window.location.href = "http://localhost:5173/"; // Redirect to homepage
      };

      const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("userID");
        window.location.href = "http://localhost:5173/login";
      }
      

    const sidebarStyle = {
        backgroundColor: 'white', // Set the background color to white
    };


  return (
    <Sidebar aria-label="Sidebar with logo branding example" style={sidebarStyle}>
      <Sidebar.Logo 
      href="/" 
      img={dragonball} 
      imgAlt="Dragon Ball"
      onClick={handleLogoClick} >
        <p>
        Manga Mania
        </p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item 
          href={`/admin/dashboard`}
          icon={HiArrowSmRight}>
            <p>
             Account Information
            </p>
          </Sidebar.Item>
          <Sidebar.Item 
          href="/admin/dashboard/upload-book" 
          icon={HiArrowSmRight}>
            <p>
            Upload Manga
            </p>
          </Sidebar.Item>
          <Sidebar.Item 
          href="/admin/dashboard/manage-books" 
          icon={HiArrowSmRight}>
            <p>
            Manage Manga
            </p>
          </Sidebar.Item>
          <Sidebar.Item 
          href="/admin/dashboard/upload-card" 
          icon={HiArrowSmRight}>
            <p>
            Add Credit Card
            </p>
          </Sidebar.Item>
          <Sidebar.Item 
          href="/admin/dashboard/manage-cards" 
          icon={HiArrowSmRight}>
            <p>
            Manage Credit Cards
            </p>
          </Sidebar.Item>
          <Sidebar.Item 
          href="http://localhost:5173/cart" 
          icon={HiArrowSmRight}>
            <p>
            View Cart
            </p>
          </Sidebar.Item>
          <Sidebar.Item 
          href="/admin/dashboard/view-past-orders" 
          icon={HiArrowSmRight}>
            <p>
            View Past Orders
            </p>
          </Sidebar.Item>
          <Sidebar.Item 
          href="http://localhost:5173/" 
          icon={HiArrowSmRight}>
            <p>
            Home Page
            </p>
          </Sidebar.Item>
          <Sidebar.Item onClick={handleLogout}
          icon={HiArrowSmRight}>
            <p>
            Sign Out
            </p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
