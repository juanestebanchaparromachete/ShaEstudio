package mundo;

import java.sql.Date;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Field;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Index;
import org.mongodb.morphia.annotations.Indexes;
import org.mongodb.morphia.annotations.Property;

@Entity("Users")
@Indexes(@Index(value= "names",fields = @Field("names")))
public class User {
	
	
	
	/**
	 * user id
	 */
	@Id
	private int id;
	/**
	 * user roll
	 */
	private String roll;
	
	/**
	 * user name
	 */
	@Property("naming")
	private String names;
	
	/**
	 * user lastnames
	 */
	private String lastNames;
	
	/**
	 * user cellphone
	 */
	private long cellPhone;
	
	/**
	 * user adress
	 */
	private String adress;
	
	/**
	 * user date of birthday
	 */
	private Date birthDay;
	
	/**
	 * user email
	 */
	private String email;
	
	/**
	 * user password
	 */
	private String password;
	/**
	 * user register date 
	 */
	private Date registerDate;
	/**
	 * 
	 * @param id
	 * @param roll
	 * @param names
	 * @param lastNames
	 * @param cellPhone
	 * @param adress
	 * @param birthDay
	 * @param email
	 * @param password
	 */

	public User(int id,String roll, String names, String lastNames, long cellPhone, String adress, Date birthDay, String email,
			String password,Date registerDate ) {
		super();
		this.roll = roll;
		this.names = names;
		this.lastNames = lastNames;
		this.cellPhone = cellPhone;
		this.adress = adress;
		this.birthDay = birthDay;
		this.email = email;
		this.password = password;
		this.id=id;
		this.registerDate=registerDate;
	}

	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getRoll() {
		return roll;
	}

	public void setRoll(String roll) {
		this.roll = roll;
	}

	public String getNames() {
		return names;
	}

	public void setNames(String names) {
		this.names = names;
	}

	public String getLastNames() {
		return lastNames;
	}

	public void setLastNames(String lastNames) {
		this.lastNames = lastNames;
	}

	public long getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(long cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

	public Date getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public Date getRegisterDate() {
		return registerDate;
	}


	public void setRegisterDate(Date registerDate) {
		this.registerDate = registerDate;
	}
	
	
	
	
	
	
	
	

}
