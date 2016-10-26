package Utilities;

import java.net.UnknownHostException;
import java.sql.Date;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

import mundo.User;

public final class ManagerDb {

	
	private Morphia morphia;
	
	private Datastore datastore;
	
	
	public ManagerDb(){
		
		morphia=new Morphia();
		morphia.mapPackage("src.main.java.mundo");
		datastore= morphia.createDatastore(new MongoClient(), "ShaEstudioDB");
		datastore.ensureIndexes();
	}

	
	public static void main(final String[] args) throws UnknownHostException {
		
		ManagerDb m = new ManagerDb();
		
		 final User elmer = new User(1, "ADMIN", "J", "p", 12345667, "  ds", new Date(1902, 2, 20), "@papas.com", "qwsa", new Date(1902, 2, 20));
	        m.datastore.save(elmer);
		 
	         
		
	}
  
}
