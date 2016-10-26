package mundo;

import javax.swing.ImageIcon;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Field;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexes;
import org.mongodb.morphia.annotations.Index;
import org.mongodb.morphia.annotations.Property;

@Entity("Items")
@Indexes(@Index(value= "price",fields = @Field("price")))
public class Item {
	
	/**
	 * item code
	 */
	@Id
	private String code;
	
	/**
	 * item name
	 */
	private String name;
	
	/**
	 * item description
	 */
	private String description;
	
	/**
	 * item dimensions
	 */
	private String dimensions;
	
	/**
	 * array of item color 
	 */
	private  String [] colors;
	
	/**
	 * item image
	 */
	private ImageIcon image;
	
	/**
	 * item price
	 */
	@Property("money")
	private double price;
	
	/**
	 * constructor
	 */
	public Item(String code, String name, String description, String dimensions, String[] colors, ImageIcon image, double price) {
		super();
		this.code = code;
		this.name = name;
		this.description = description;
		this.dimensions = dimensions;
		this.colors = colors;
		this.image = image;
		this.price= price;
	}

	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDimensions() {
		return dimensions;
	}

	public void setDimensions(String dimensions) {
		this.dimensions = dimensions;
	}

	public String[] getColors() {
		return colors;
	}

	public void setColors(String[] colors) {
		this.colors = colors;
	}

	public ImageIcon getImage() {
		return image;
	}

	public void setImage(ImageIcon image) {
		this.image = image;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}
	
	
	
}
