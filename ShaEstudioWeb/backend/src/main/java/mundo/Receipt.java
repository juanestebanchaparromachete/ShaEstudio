package mundo;

import java.sql.Date;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Field;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Index;
import org.mongodb.morphia.annotations.Indexes;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;

@Entity("Receipts")
@Indexes(@Index(value= "totalPurchase",fields = @Field("totalPurchase")))
public class Receipt {
	
	/**
	 *  receipt date
	 */
	private Date receiptDate;
	
	/**
	 * receipt user id
	 */
	@Id
	private int userId;
	
	/**
	 * purchase value
	 */
	@Property("purchaseValue")
	private double totalPurchase;
	
	/**
	 * id Purchase
	 */
	@Reference
	private Purchase purchase;
	
	/**
	 * Constructor
	 */
	public Receipt(Date receiptDate, int userId, double totalPurchase, Purchase purchase) {
		super();
		this.receiptDate = receiptDate;
		this.userId = userId;
		this.totalPurchase = totalPurchase;
		this.purchase =purchase;
	}
	public Date getReceiptDate() {
		return receiptDate;
	}
	public void setReceiptDate(Date receiptDate) {
		this.receiptDate = receiptDate;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public double getTotalPurchase() {
		return totalPurchase;
	}
	public void setTotalPurchase(double totalPurchase) {
		this.totalPurchase = totalPurchase;
	}
	public Purchase getPurchase() {
		return purchase;
	}
	public void setIdPurchase(Purchase purchase) {
		this.purchase = purchase;
	}
	
	
	
	
}
