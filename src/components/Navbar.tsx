import React from 'react'

const menuList = [
    {name:"Home",link:"/"},
    {name:"About",link:"/about"},
    {name:"Contact",link:"/contact"},
   
  ]

function Navbar(){
  return (<nav>
    <ul className='flex gap-3 items-center'>
{menuList?.map((item)=>{
  return(<li key={item.name}>{item.name}</li>)
})}
</ul>
</nav>
  )
}

export default Navbar