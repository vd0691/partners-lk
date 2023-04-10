import { CartProduct, Contractor, Partner, Product, ProductCategories, User } from "./Interfaces";
export interface RootState {
    auth: AuthState
    error: ErrorsState
    products: ProductsState
    dataSort: DataSortState
    partner: PartnerState
    cart: CartState 
    contractors: ContractorsState 
}

export interface CartState {
    cartProducts: CartProduct[] 
}

export interface AuthState {
    user: User | null,
    status: {
        loggedIn: Boolean
    }
}

export interface ContractorsState {
    contractors: Contractor[],
    contractor: Contractor | null
}

export interface PartnerState {
    partner: Partner
}

export interface ProductsState {
    productsList: Product[],
    productsCategories: ProductCategories[]
    totalItems: number
}

export interface DataSortState {
    perPage: number,
    sort: string
}

export interface ErrorsState {
    message: string | null
}