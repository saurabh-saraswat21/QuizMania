const toggle = document.getElementsByClassName('toggle');
const items = document.getElementsByClassName('items');
const len = items.length;

toggle[0].addEventListener('click' ,function(){
 for(var i=0;i<len;i++)
    {
    items[i].classList.toggle('active');
}
})
