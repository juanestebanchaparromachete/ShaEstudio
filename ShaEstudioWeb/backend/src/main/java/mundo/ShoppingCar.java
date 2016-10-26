package mundo;

import java.util.ArrayList;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Field;
import org.mongodb.morphia.annotations.Index;
import org.mongodb.morphia.annotations.Indexes;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Entity("ShoppingCars")
@Indexes(@Index(value= "totalPrice",fields = @Field("totalPrice")))
public class ShoppingCar {
	
	/**
	 * total shopping car 
	 */
	@Property("finalValue")
	private double totalPrice;
	
	/**
	 * array of items 
	 */
	@Reference
	private ArrayList<Item> itemsShoppingCar;
	
	/**
	 * Shopping car user 
	 */
	@Reference
	private User user ;

	public ShoppingCar(double totalPrice, ArrayList<Item> itemsShoppingCar, User user) {
		super();
		this.totalPrice = totalPrice;
		this.itemsShoppingCar = itemsShoppingCar;
		this.user = user;
	}

	public double getTotal() {
		return totalPrice;
	}

	public void setTotal(double totalPrice) {
		this.totalPrice = totalPrice;
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
