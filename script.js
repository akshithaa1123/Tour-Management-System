const tours = [
  { name: "Manali Adventure", location: "Himachal", distance: "520 km", days: 4, people: 2, price: 15000, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
  { name: "Goa Getaway", location: "Goa", distance: "610 km", days: 3, people: 2, price: 12000, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Jaipur Heritage", location: "Rajasthan", distance: "270 km", days: 2, people: 4, price: 8000, image: "https://images.unsplash.com/photo-1548013146-72479768bada" },
  { name: "Kerala Backwaters", location: "Kerala", distance: "2200 km", days: 5, people: 2, price: 20000, image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1" },
  { name: "Darjeeling Hills", location: "West Bengal", distance: "1800 km", days: 6, people: 2, price: 22000, image: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60b" },
  { name: "Agra Taj Tour", location: "Uttar Pradesh", distance: "210 km", days: 1, people: 2, price: 7000, image: "https://images.unsplash.com/photo-1587574293340-e0011c4e5f87" },
  { name: "Andaman Escape", location: "Andaman", distance: "1600 km", days: 7, people: 2, price: 30000, image: "https://images.unsplash.com/photo-1518684079-3c830dcef090" },
  { name: "Ladakh Expedition", location: "Ladakh", distance: "1200 km", days: 8, people: 4, price: 40000, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" }
];

const toursContainer = document.getElementById("toursContainer");
const locationFilter = document.getElementById("locationFilter");
const priceFilter = document.getElementById("priceFilter");

if(locationFilter){
  const locations = [...new Set(tours.map(t=>t.location))];
  locations.forEach(loc=>{
    const option = document.createElement("option");
    option.value=loc;
    option.textContent=loc;
    locationFilter.appendChild(option);
  });
}

function renderTours(list){
  if(!toursContainer) return;
  toursContainer.innerHTML="";
  list.forEach(t=>{
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${t.image}" alt="${t.name}">
      <div class="card-content">
        <h3>${t.name}</h3>
        <p>Location: ${t.location}</p>
        <p>Distance: ${t.distance}</p>
        <p>Days: ${t.days}</p>
        <p>People: ${t.people}</p>
        <p class="price">₹${t.price.toLocaleString("en-IN")}</p>
        <button class="bookBtn">Book Now</button>
      </div>
    `;
    toursContainer.appendChild(card);
  });
  addBookingEvents();
}

function addBookingEvents(){
  document.querySelectorAll(".bookBtn").forEach((btn,i)=>{
    btn.addEventListener("click",()=>openBookingModal(tours[i]));
  });
}

if(toursContainer) renderTours(tours);

document.getElementById("filterBtn")?.addEventListener("click",()=>{
  const selected=locationFilter.value;
  const maxPrice=Number(priceFilter.value);
  let filtered=tours;
  if(selected) filtered=filtered.filter(t=>t.location===selected);
  if(maxPrice) filtered=filtered.filter(t=>t.price<=maxPrice);
  renderTours(filtered);
});

document.getElementById("resetBtn")?.addEventListener("click",()=>{
  locationFilter.value="";
  priceFilter.value="";
  renderTours(tours);
});

const modal=document.getElementById("bookingModal");
const closeModal=document.getElementById("closeModal");
const modalTitle=document.getElementById("modalTitle");
const bookingForm=document.getElementById("bookingForm");
let selectedTour=null;

function openBookingModal(tour){
  selectedTour=tour;
  modalTitle.textContent=`Book: ${tour.name}`;
  modal.style.display="flex";
}

closeModal?.addEventListener("click",()=>modal.style.display="none");
window.addEventListener("click",e=>{if(e.target===modal) modal.style.display="none";});

bookingForm?.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const people=Number(document.getElementById("people").value);
  const total=selectedTour.price * people / selectedTour.people;
  alert(`Thank you, ${name}! Your booking for ${selectedTour.name} is confirmed.\nTotal Amount: ₹${total.toLocaleString("en-IN")}\nConfirmation sent to: ${email}`);
  bookingForm.reset();
  modal.style.display="none";
});

document.getElementById("contactForm")?.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("contactName").value;
  const email=document.getElementById("contactEmail").value;
  alert(`Thank you, ${name}! We’ll get back to you shortly at ${email}.`);
  e.target.reset();
});
