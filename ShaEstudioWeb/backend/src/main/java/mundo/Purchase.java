package mundo;

import java.sql.Date;
import java.util.ArrayList;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Field;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Index;
import org.mongodb.morphia.annotations.Indexes;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Entity("Purchases")
@Indexes(@Index(value= "purchaseValue",fields = @Field("purchaseValue")))
public class Purchase {


	/**
	 * receip purchase date
	 */
	private Date purchaseDate;

	/**
	 * receip purchase value
	 */	
	
	@Property("totalValue")
	private double purchaseValue;
	
	/**
	 * receips purchase id
	 */
	@Id
	private int  id;
	
	/**
	 * receips purchase items
	 */
	private ArrayList<String> items;
	
	/**
	 * receips purchase number of items
	 */
	private double numberOfItems;
	
	/**
	 * user´s purchase
	 */
	@Reference
	private User buyer;
	
	/**
	 * constructor
	 */
	public Purchase(Date purchaseDate, double purchaseValue, int id, ArrayList<String> items, double numberOfItems,
			User buyer) {
		super();
		this.purchaseDate = purchaseDate;
		this.purchaseValue = purchaseValue;
		this.id = id;
		this.items = items;
		this.numberOfItems = numberOfItems;
		this.buyer = buyer;
	}
	
	public Date getPurchaseDate() {
		return purchaseDate;
	}
	
	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	public double getPurchaseValue() {
		return purchaseValue;
	}
	public void setPurchaseValue(double purchaseValue) {
		this.purchaseValue = purchaseValue;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public ArrayList<String> getItems() {
		return items;
	}
	public void setItems(ArrayList<String> items) {
		this.items = items;
	}
	public double getNumberOfItems() {
		return numberOfItems;
	}
	public void setNumberOfItems(double numberOfItems) {
		this.numberOfItems = numberOfItems;
	}
	public User getBuyer() {
		return buyer;
	}
	public void setBuyer(User buyer) {
		this.buyer = buyer;
	}
	
	
	
}
