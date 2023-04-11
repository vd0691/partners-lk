import { CartProduct, Contractor, Partner, Product, ProductCategories, User } from "./Interfaces";
import { UserId } from "./UserId";
export interface RootState {
    auth: AuthState
    error: ErrorsState
    products: ProductsState
    dataSort: DataSortState
    partner: PartnerState
    cart: CartState 
    contractors: ContractorsState,
    user: UserState 
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
    contractor: Contractor
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

export interface UserState {
    userId: UserId
}