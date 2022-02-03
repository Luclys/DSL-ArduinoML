/*
 * generated by Xtext 2.23.0
 */
package fr.polytech.si5.dsl.arduino;

import org.eclipse.emf.ecore.EPackage;
import com.google.inject.Injector;
import fr.polytech.si5.dsl.arduino.arduinoML.ArduinoMLPackage;

/**
 * Initialization support for running Xtext languages without Equinox extension registry.
 */
public class ArduinoMLStandaloneSetup extends ArduinoMLStandaloneSetupGenerated {

	public static void doSetup() {
		new ArduinoMLStandaloneSetup().createInjectorAndDoEMFRegistration();
	}
	
	@Override
	  public void register(Injector injector) {
	    EPackage.Registry.INSTANCE.put(ArduinoMLPackage.eINSTANCE.getNsURI(), 
	    		ArduinoMLPackage.eINSTANCE.getNsURI());
	    super.register(injector);
	  }
}
