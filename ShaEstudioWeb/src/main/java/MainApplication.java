import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.server.ResourceConfig;

import Security.AuthenticationFilter;
import Security.GsonMessageBodyHandler;

public class MainApplication extends ResourceConfig  {

	public MainApplication() {
		packages("");
        register(LoggingFilter.class);
        register(GsonMessageBodyHandler.class);
 
        //Register Auth Filter here
        register(AuthenticationFilter.class);
	}
	
}