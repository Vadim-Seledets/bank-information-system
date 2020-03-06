import { Stateful, action, trigger, isolated, nonreactive } from 'reactronic'
import { App, BASE_URL } from '../App'
import { CustomerInfo } from './CustomerInfo'
import { IApiErrors } from '../ApiErrors'
import { Customer, ICustomerShortInfo } from './Customer'

export class CustomersPage extends Stateful {
  app: App
  customers: Array<Customer>
  filteredCustomers: Array<Customer>
  selectedCustomer?: Customer
  customerInfo: CustomerInfo
  
  filter = ''
  deleteIsRequested = false

  constructor(app: App) {
    super()
    this.app = app
    this.customers = new Array<Customer>()
    this.filteredCustomers = this.customers
    this.selectedCustomer = undefined
    this.customerInfo = new CustomerInfo(this)
  }

  @action
  setSelectedCustomer(customer?: Customer): void {
    this.selectedCustomer = customer
  }

  @action
  toggleCustomerSelection(customer: Customer): void {
    if (this.selectedCustomer?.id === customer.id) {
      this.setSelectedCustomer(undefined)
    } else {
      this.setSelectedCustomer(customer)
    }
  }

  @action
  addNewCustomer(): void {
    this.selectedCustomer = new Customer()
    this.app.currentTab?.setCurrentPageName('EditCustomerPage')
  }

  @action
  editCustomerInfo(): void {
    if (this.selectedCustomer) {
      if (this.selectedCustomer.id && !this.selectedCustomer.isFullInfoModelLoaded) {
        this.selectedCustomer.getFullInfoModel()
      }
      this.app.currentTab?.setCurrentPageName('EditCustomerPage')
    }
  }

  @action
  showCustomerInfo(customer: Customer): void {
    if (customer.id && !customer.isFullInfoModelLoaded) {
      customer.getFullInfoModel()
    }
    this.setSelectedCustomer(customer)
    this.app.currentTab?.setCurrentPageName('CustomerInfoPage')
  }

  @action
  cancelEditing(): void {
    this.customerInfo.setApiErrors(undefined)
    if (this.selectedCustomer) {
      if (this.selectedCustomer.id) {
        this.selectedCustomer.getFullInfoModel()
      } else {
        const start = this.customers.indexOf(this.selectedCustomer)
        this.customers.splice(start, 1)
        this.setSelectedCustomer(undefined)
      }
      this.app.currentTab?.setCurrentPageName('CustomersListPage')
    }
  }

  @action
  setFilter(value: string): void {
    this.filter = value
  }

  @trigger
  makeFilteredCustomerList(): void {
    const filter = this.filter
    this.filteredCustomers = this.customers.filter(c => {
      const fullName = nonreactive(() => `${c.firstName} ${c.middleName} ${c.lastName}`)
      const startIndex = fullName.toLowerCase().indexOf(filter.toLowerCase())
      isolated(() => c.setHighlightingRange({ start: startIndex, length: filter.length }))
      return startIndex !== -1
    })
  }

  @action
  async editOrPublishCustomer(): Promise<void> {
    this.customerInfo.setApiErrors(undefined)
    if (this.selectedCustomer) {
      if (this.selectedCustomer.id) {
        await this.editCustomerInfoRequest(this.selectedCustomer)
      } else {
        await this.publishNewCustomerRequest(this.selectedCustomer)
      }
      if (this.customerInfo.apiErrors === undefined) {
        this.app.currentTab?.setCurrentPageName('CustomersListPage')
      }
    }
  }

  // Http requests

  @action
  async getAllCustomersInShortInfoModelRequest(): Promise<void> {
    const customers = await this.app.httpClient.get<Array<ICustomerShortInfo>>(`${BASE_URL}/customers`)
    if (customers) {
      this.customers = customers.map(customerShortInfo => {
        const customer = new Customer()
        customer.setShortInfo(customerShortInfo)
        return customer
      })
    }
  }

  @action
  async publishNewCustomerRequest(customer: Customer): Promise<void> {
    const url = `${BASE_URL}/customers`
    const customerId = await this.app.httpClient.post<string>(url, customer.getJson())
    if (customerId) {
      customer.setId(customerId)
    } else {
      const errors = this.app.httpClient.getAndDeleteLastError<IApiErrors>('POST', url)
      this.customerInfo.setApiErrors(errors)
    }
  }

  @action
  async editCustomerInfoRequest(customer: Customer): Promise<void> {
    const url = `${BASE_URL}/customers/${customer.id}`
    await this.app.httpClient.put(url, customer.getJson())
    const errors = this.app.httpClient.getAndDeleteLastError<IApiErrors>('PUT', url)
    this.customerInfo.setApiErrors(errors)
  }

  @action
  async deleteCustomerRequest(customer?: Customer): Promise<void> {
    if (customer) {
      if (customer.id) {
        const url = `${BASE_URL}/customers/${customer.id}`
        await this.app.httpClient.delete(url)
        const errors = this.app.httpClient.getAndDeleteLastError<IApiErrors>('DELETE', url)
        this.customerInfo.setApiErrors(errors)
        if (!errors) {
          const start = this.customers.indexOf(customer)
          this.customers.splice(start, 1)
          this.app.currentTab?.setCurrentPageName('CustomersListPage')
          this.setSelectedCustomer(undefined)
        }
      }
    }
  }

  @action
  setDeleteIsRequested(value: boolean): void {
    this.deleteIsRequested = value
  }

  @trigger
  dropDeleteRequest(): void {
    this.selectedCustomer /* Sensetivity list item */
    this.deleteIsRequested = false
  }
}
