import { Stateful, action, trigger, isolated } from 'reactronic'
import { Auxiliary } from '../Auxiliary'
import { App } from '../App'
import { CustomerInfo } from './CustomerInfo'
import { IInfoErrors } from '../Errors'
import { Customer, ICustomerShortInfo } from './Customer'

export class CustomersPage extends Stateful {
  app: App
  customers: Array<Customer>
  filteredCustomers: Array<Customer>
  selectedCustomer?: Customer
  customerInfo: CustomerInfo
  
  filter = ''
  deleteIsRequested = false
  
  isRowWithCustomerHovered = false
  isGenderHovered = false
  isFullNameHovered = false
  isEmailHovered = false
  isActionsHovered = false
  hoveredRowNumber = 0

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
    this.hoveredRowNumber = 0
  }

  @action
  addNewCustomer(): void {
    const newCustomer = new Customer()
    this.customers.push(newCustomer)
    this.selectedCustomer = newCustomer
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
    if (this.selectedCustomer) {
      if (this.selectedCustomer.id) {
        this.selectedCustomer.getFullInfoModel()
      } else {
        const start = this.customers.indexOf(this.selectedCustomer)
        this.customers.splice(start, 1)
        if (this.selectedCustomer === this.selectedCustomer) {
          this.setSelectedCustomer(undefined)
        }
      }
      this.app.currentTab?.setCurrentPageName('CustomersListPage')
    }
  }

  @action
  setFilter(value: string): void {
    this.filter = value
  }

  @trigger
  makeFilteredCustomers(): void {
    const filter = this.filter
    this.filteredCustomers = this.customers.filter(c => {
      const fullName = `${c.firstName} ${c.middleName} ${c.lastName}`
      const startIndex = fullName.toLowerCase().indexOf(filter.toLowerCase())
      isolated(() => c.setHighlightingRange({ start: startIndex, length: filter.length }))
      return startIndex !== -1
    })
  }

  @action
  async editOrPublishCustomer(): Promise<void> {
    if (this.selectedCustomer) {
      if (this.selectedCustomer.id) {
        await this.editCustomerInfoRequest(this.selectedCustomer)
      } else {
        await this.publishNewCustomerRequest(this.selectedCustomer)
      }
      if (!this.selectedCustomer.infoErrors.hasAnyErrors) {
        this.app.currentTab?.setCurrentPageName('CustomersListPage')
      }
    }
  }

  @action
  async getAllCustomersInShortInfoModelRequest(): Promise<void> {
    const customersInfo = await this.app.httpClient.get<Array<ICustomerShortInfo>>(`https://localhost:5001/customers`)
    if (customersInfo.successful && customersInfo.data) {
      this.customers = customersInfo.data.map(customerShortInfo => {
        const customer = new Customer()
        customer.setShortInfo(customerShortInfo)
        return customer
      })
    }
  }

  @action
  async publishNewCustomerRequest(customer: Customer): Promise<void> {
    const response = await this.app.httpClient.post<string, IInfoErrors>(
      `https://localhost:5001/customers`, customer.getJson())
    if (response.successful && response.data) {
      customer.setId(response.data)
      customer.infoErrors.setHasErrors(false)
    } else if (!response.successful && response.errorData) {
      customer.infoErrors.initialize(response.errorData)
      customer.infoErrors.setHasErrors(true)
    }
  }

  @action
  async editCustomerInfoRequest(customer: Customer): Promise<void> {
    const response = await this.app.httpClient.put<any, IInfoErrors>(
      `https://localhost:5001/customers/${customer.id}`, customer.getJson())
    if (response.successful) {
      customer.infoErrors.setHasErrors(false)
    } else if (!response.successful && response.errorData) {
      customer.infoErrors.initialize(response.errorData)
      customer.infoErrors.setHasErrors(true)
    }
  }

  @action
  async deleteCustomerRequest(customer?: Customer): Promise<void> {
    if (customer) {
      if (customer.id) {
        const response = await this.app.httpClient.delete<any, IInfoErrors>(
          `https://localhost:5001/customers/${customer.id}`)
        if (response.successful) {
          customer.infoErrors.setHasErrors(false)
        } else if (!response.successful && response.errorData) {
          customer.infoErrors.initialize(response.errorData)
          customer.infoErrors.setHasErrors(true)
        }
      }
      const start = this.customers.indexOf(customer)
      this.customers.splice(start, 1)
      if (customer === this.selectedCustomer) {
        this.setSelectedCustomer(undefined)
      }
    }
  }

  @action
  setIsRowWithCustomerHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isRowWithCustomerHovered = value
  }
  
  @action
  setIsGenderHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isGenderHovered = value
  }
  
  @action
  setIsFullNameHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isFullNameHovered = value
  }
  
  @action
  setIsEmailHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isFullNameHovered = value
  }

  @action
  setIsActionsHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isActionsHovered = value
  }

  @action
  setDeleteIsRequested(value: boolean): void {
    this.deleteIsRequested = value
  }

  @trigger
  dropDeleteRequest(): void {
    this.selectedCustomer /* Sensetivity list item */
    this.setDeleteIsRequested(false)
  }

  isRowHovered(row: number): boolean {
    return (this.isRowWithCustomerHovered
      || this.isGenderHovered
      || this.isFullNameHovered
      || this.isEmailHovered
      || this.isActionsHovered
    ) && this.hoveredRowNumber === row
  }
}
