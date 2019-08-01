# Read data files from Azure Blob Storage, transform & load data in Azure CosmosDB 
This project contains source code for an Azure Function.  The function essentially reads Azure cost management reports from an Azure Storage Blob container, transforms the CSV data to JSON and then loads the JSON data into a Azure CosmosDB collection.
The function only copies four fields from the CSV file to the JSON output.  Developers can easily modify the code to select relevant fields to be included in the JSON output.
