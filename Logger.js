const Logger = {
	LIMIT: 150,
	mode: "normal",
	tabs: "",
	logs: ["Logger"],
	
	log: (...things) => {
		for (let x in things)
		{
			const text = Logger.stringify(things[x]);
			
			if (Logger.logs.length > 0)
			{
				Logger.logs.push(text);
			} else {
				Logger.logs = [text];
			}
			
			console.log(text);
			Logger.logs++;
		}
	},
	
	stringify: (thing) => {
		let out = "";
		
		if (thing == null)
		{
			out = "null";
		} else {
			switch (typeof thing)
			{
				case "string":
					out = `"${thing}"`;
					break;
				
				case "number":
					out = thing.toString();
					break;
				
				case "boolean":
					out = `boolean ${thing.toString()}`;
					break;
				
				case "bigint":
					out = `bigint ${thing.toString()}n`;
					break;
				
				case "function":
					out = `${thing.toString()};`;
					break;
				
				case "object":
					const array = thing instanceof Array;
					
					let length = 0;
					
					if (array)
					{
						length = thing.length;
					} else {
						for (let x in thing)
						{
							length++;
						}
					}
					
					if (length == 0)
					{
						return array ? "[]" : "{}";
					} else if (length >= Logger.LIMIT) {
						return `Too much properties: ${length}/${Logger.LIMIT}`;
					}
					
					out += `${array ? "[" : "{"}\n`;
					
					Logger.tabs += "\t";
					let count = 0;
					
					for (let x in thing)
					{
						count++;
						
						out += Logger.tabs + (array ? x : `"${x}"`) + (Logger.mode == "compressed" ? ":" : ": ") + (thing === thing[x] ? "ITSELF" : Logger.stringify(thing[x])) + (length > count ? ",\n" : "");
					}
					
					Logger.tabs = Logger.tabs.replace("\t","");
					
					out += `\n${Logger.tabs}${array ? "]" : "}"}`;
					break;
				
				case "symbol":
					out = `symbol ${thing.description || "unknow"}`;
					break;
				
				default:
					out = thing.toString();
					break;
			}
		}
		
		if (Logger.mode == "compressed")
		{
			out = out
			.split("\t").join("")
			.split("\n").join("");
		}
		
		return out;
	},
	
	getLogs: () => Logger.logs.join("\n")
};
