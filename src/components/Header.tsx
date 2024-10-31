

const menuList = [
  {name:"Home",link:"/"},
  {name:"About",link:"/about"},
  {name:"Contact",link:"/contact"},
 
]


const Header = () => {
  return (
    <nav className='flex items-center gap-3 py-4 px-14 border-b justify-between'>
      <img className="h-4 md:h-5" src="/favicon.ico" alt="Logo" />
<ul className='flex gap-3 items-center'>
{menuList?.map((item)=>{
  return(<li key={item.name}>{item.name}</li>)
})}
</ul>
    </nav>
  )
}

export default Header