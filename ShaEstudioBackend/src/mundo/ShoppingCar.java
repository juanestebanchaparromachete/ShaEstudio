package mundo;

import java.util.ArrayList;

public class ShoppingCar {
	
	/**
	 * total shopping car 
	 */
	private double total;
	
	/**
	 * array of items 
	 */
	private ArrayList<Item> itemsShoppingCar;
	
	/**
	 * Shopping car user 
	 */
	private User user ;

	public ShoppingCar(double total, ArrayList<Item> itemsShoppingCar, User user) {
		super();
		this.total = total;
		this.itemsShoppingCar = itemsShoppingCar;
		this.user = user;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public ArrayList<Item> getItemsShoppingCar() {
		return itemsShoppingCar;
	}

	public void setItemsShoppingCar(ArrayList<Item> itemsShoppingCar) {
		this.itemsShoppingCar = itemsShoppingCar;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	

}
