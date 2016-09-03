package dao;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;


import org.bson.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Locale;

import static java.util.Arrays.asList;

public class ShaTeamMaster {

	MongoDatabase  db  ;
	MongoClient mongoClient;
	public ShaTeamMaster(){
		
		mongoClient = new MongoClient();
		db  = mongoClient.getDatabase("test");
		
		System.out.println("ALEJO ES UNA PUTAAAAA RRE RICA !!!!!!!!!!!");
		
		try {
			insertDocument();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
	}


public void insertDocument() throws ParseException
{
	DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.ENGLISH);
	db.getCollection("restaurants").insertOne(
	        new Document("address",
	                new Document()
	                        .append("street", "2 Avenue")
	                        .append("zipcode", "10075")
	                        .append("building", "1480")
	                        .append("coord", asList(-73.9557413, 40.7720266)))
	                .append("borough", "Manhattan")
	                .append("cuisine", "Italian")
	                .append("grades", asList(
	                        new Document()
	                                .append("date", format.parse("2014-10-01T00:00:00Z"))
	                                .append("grade", "A")
	                                .append("score", 11),
	                        new Document()
	                                .append("date", format.parse("2014-01-16T00:00:00Z"))
	                                .append("grade", "B")
	                                .append("score", 17)))
	                .append("name", "Vella")
	                .append("restaurant_id", "41704620"));
}


public static void main(String [ ] args)
{
	System.out.println("ALEJO ES UNA PUTAAAAA RRE RICA !!!!!!!!!!!");
	ShaTeamMaster n = new ShaTeamMaster();

	
}
}
