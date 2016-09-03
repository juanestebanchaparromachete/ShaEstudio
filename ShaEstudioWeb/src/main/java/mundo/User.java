package mundo;

import java.sql.Date;

public class User {
	
	/**
	 * user constant
	 */
	public final static String USER_ROLL ="user";
	
	/**
	 * admin constant
	 */
	public final static String ADMIN_ROLL ="admin";
	
	/**
	 * user roll
	 */
	private String roll;
	
	/**
	 * user name
	 */
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

	public User(String roll, String names, String lastNames, long cellPhone, String adress, Date birthDay, String email,
			String password) {
		super();
		this.roll = roll;
		this.names = names;
		this.lastNames = lastNames;
		this.cellPhone = cellPhone;
		this.adress = adress;
		this.birthDay = birthDay;
		this.email = email;
		this.password = password;
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
	
	
	
	
	
	

}
