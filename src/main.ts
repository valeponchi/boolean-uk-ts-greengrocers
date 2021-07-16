import './style.css'
import './styles/reset.css'
import './styles/index.css'

const app = document.querySelector<HTMLDivElement>('#app')!

// const h1El = document.createElement('h1')
// h1El.innerText = 'welcome to TS'

// app.append(h1El)

/*
This is how an item object should look like
{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }
*/

// Repo: boolean-uk-greengrocers

// Description
// In this exercise we explore a common scenario in eCommerce, adding and removing items from the cart, and calculating the total.

// Instructions
// - Use this template as a starting point => https://codesandbox.io/s/js-exercise-greengrocer-template-grqi6
// - Create a state object
// - Create action functions that update state
// - Create render functions that read from state

// Tips
// - Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
// - Taking HTML semantics into consideration, use a button when an action is happening on the same page

// Deliverables
// - A user can view a selection of items in the store
// - From the store, a user can add an item to their cart
// - From the cart, a user can view and adjust the number of items in their cart
//     - If an item's quantity equals zero it is removed from the cart
// - A user can view the current total in their cart

interface Item {
	id: string //<- the item id matches the icon name in the assets/icons folder
	name: string
	price: number //<- You can come up with your own prices
	quantityToCart: number
}

let state: Item[] = [
	{
		id: '001-beetroot', //<- the item id matches the icon name in the assets/icons folder
		name: 'beetroot',
		price: 0.1, //<- You can come up with your own prices
		quantityToCart: 0,
	},
	{
		id: '002-carrot', //<- the item id matches the icon name in the assets/icons folder
		name: 'carrot',
		price: 0.2, //<- You can come up with your own prices
		quantityToCart: 0,
	},
	{
		id: '003-apple', //<- the item id matches the icon name in the assets/icons folder
		name: 'apple',
		price: 0.3, //<- You can come up with your own prices
		quantityToCart: 0,
	},
	{
		id: '004-apricot', //<- the item id matches the icon name in the assets/icons folder
		name: 'apricot',
		price: 0.4, //<- You can come up with your own prices
		quantityToCart: 0,
	},
	{
		id: '005-avocado', //<- the item id matches the icon name in the assets/icons folder
		name: 'avocado',
		price: 0.5, //<- You can come up with your own prices
		quantityToCart: 0,
	},
	{
		id: '006-bananas', //<- the item id matches the icon name in the assets/icons folder
		name: 'bananas',
		price: 0.6, //<- You can come up with your own prices
		quantityToCart: 0,
	},
	{
		id: '007-bell-pepper', //<- the item id matches the icon name in the assets/icons folder
		name: 'bell-pepper',
		price: 0.7, //<- You can come up with your own prices
		quantityToCart: 0,
	},
	{
		id: '008-berry', //<- the item id matches the icon name in the assets/icons folder
		name: 'berry',
		price: 0.8, //<- You can come up with your own prices
		quantityToCart: 0,
	},
	{
		id: '009-blueberry', //<- the item id matches the icon name in the assets/icons folder
		name: 'blueberry',
		price: 0.9, //<- You can come up with your own prices
		// toCart: false,
		quantityToCart: 0,
	},
	{
		id: '010-eggplant', //<- the item id matches the icon name in the assets/icons folder
		name: 'eggplant',

		price: 1.0, //<- You can come up with your own prices
		// toCart: false,
		quantityToCart: 0,
	},
]

let spanTotal: Element | null = document.querySelector<HTMLDivElement>(
	`.total-number`
) as HTMLDivElement

function renderStoreItems(items: Item[]) {
	let storeItemsUl: Element | null =
		document.querySelector<HTMLDivElement>(`.store--item-list`)
	for (const item of items) {
		let storeItemLi = document.createElement(`li`)

		let storeItemImgDiv = document.createElement(`div`)
		storeItemImgDiv.setAttribute(`class`, `store--item-icon`)

		let storeItemImg = document.createElement(`img`)
		storeItemImg.setAttribute(`src`, `assets/icons/${item.id}.svg`)

		let addToCartBtn = document.createElement(`button`)
		addToCartBtn.innerText = 'Add to cart'

		addToCartBtn.addEventListener(`click`, function () {
			console.log(item)
			if (item.quantityToCart === 0) {
				displayItemToCart(item)
				addQuantityIntoCart(item)
			} else {
				addQuantityIntoCart(item)
			}
		})

		storeItemImgDiv.append(storeItemImg)
		storeItemLi.append(storeItemImgDiv, addToCartBtn)
		storeItemsUl.append(storeItemLi)
	}
}

function addQuantityIntoCart(item: Item) {
	// 🔽 ⬇⬇⬇ - not a global variable - created in the f displayItemToCart
	let quantityOfItemInCart = document.querySelector(`.quantity${item.name}`) //  El w/ NUMBER --> quantity in the cart
	if (quantityOfItemInCart) {
		quantityOfItemInCart.innerText = ++item.quantityToCart
		updateTotal(state)
	}
}

function minusQuantityIntoCart(item: Item) {
	// 🔽 ⬇⬇⬇ - not a global variable - created in the f displayItemToCart
	let quantityOfItemInCart = document.querySelector(`.quantity${item.name}`) //  El w/ NUMBER --> quantity in the cart
	quantityOfItemInCart.innerText = --item.quantityToCart
	updateTotal(state)
}

function removeItemFromCart(item: Item) {
	let itemFromCart = document.querySelector(`.cart${item.name}`)
	itemFromCart.remove()
	updateTotal(state)
}

function displayItemToCart(item: Item) {
	let cartUl = document.querySelector(`.item-list.cart--item-list`)

	let cartLi = document.createElement(`li`)
	cartLi.setAttribute(`class`, `cart${item.name}`)

	let cartImg = document.createElement(`img`)
	cartImg.setAttribute(`class`, `cart--item-icon`)
	cartImg.setAttribute(`src`, `assets/icons/${item.id}.svg`)
	cartImg.setAttribute(`alt`, `${item.name}`)

	let cartName = document.createElement(`p`)
	cartName.innerText = `${item.name}`

	let cartMinusBtn = document.createElement(`button`)
	cartMinusBtn.setAttribute(`class`, `quantity-btn`, `remove-btn center`)
	cartMinusBtn.innerText = '-'
	cartMinusBtn.addEventListener(`click`, function () {
		if (item.quantityToCart === 1) {
			minusQuantityIntoCart(item)
			removeItemFromCart(item)
		} else {
			minusQuantityIntoCart(item)
		}
	})

	let quantityOfItemInCart = document.createElement(`span`) // Span for "How many of that item are in the cart?"
	quantityOfItemInCart.setAttribute(`class`, `quantity${item.name}`) //I ADDED THIS ATTRIBUTE to query it in f addQuantityToCart & f minusQuantityToCart

	let cartPlusBtn = document.createElement(`button`)
	cartPlusBtn.setAttribute(`class`, `quantity-btn`, `add-btn center`)
	cartPlusBtn.innerText = '+'

	cartPlusBtn.addEventListener(`click`, function () {
		addQuantityIntoCart(item)
	})

	let deleteLiFromCart = document.createElement(`button`)
	deleteLiFromCart.setAttribute(
		`class`,
		`quantity-text center deleteItem delete${item.name}`
	)
	deleteLiFromCart.innerText = 'X'
	deleteLiFromCart.addEventListener(`click`, function () {
		item.quantityToCart = 0
		console.log(`quantity to cart of ${item.name}:`, item.quantityToCart)
		console.log(`${item.name} in the state:`, item)

		removeItemFromCart(item)
	})

	cartUl.append(cartLi)
	cartLi.append(
		cartImg,
		cartName,
		cartMinusBtn,
		quantityOfItemInCart,
		cartPlusBtn,
		deleteLiFromCart
	)
}

function updateTotal(items: Item[]) {
	let newTotal = 0
	for (const item of items) {
		newTotal += item.quantityToCart * item.price
	}

	spanTotal.innerText = newTotal.toFixed(2)
}

renderStoreItems(state)
//to render the list of available items, I have to loop over the array
