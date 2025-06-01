
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, DollarSign } from "lucide-react";

interface PricingItem {
  id: string;
  description: string;
  unitRate: number;
  uom: string;
  quantity: number;
  totalPrice: number;
  remarks: string;
}

interface PricingTableProps {
  onTotalChange: (total: number) => void;
  onItemsChange: (items: PricingItem[]) => void;
}

const PricingTable = ({ onTotalChange, onItemsChange }: PricingTableProps) => {
  const [items, setItems] = useState<PricingItem[]>([
    {
      id: "1",
      description: "",
      unitRate: 0,
      uom: "",
      quantity: 0,
      totalPrice: 0,
      remarks: ""
    }
  ]);
  const [subtotal, setSubtotal] = useState(0);
  const [cgst, setCgst] = useState(9);
  const [sgst, setSgst] = useState(9);
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    const newItem: PricingItem = {
      id: Date.now().toString(),
      description: "",
      unitRate: 0,
      uom: "",
      quantity: 0,
      totalPrice: 0,
      remarks: ""
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onItemsChange(updatedItems);
  };

  const deleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    onItemsChange(updatedItems);
    calculateTotals(updatedItems);
  };

  const updateItem = (id: string, field: keyof PricingItem, value: string | number) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'unitRate' || field === 'quantity') {
          updatedItem.totalPrice = updatedItem.unitRate * updatedItem.quantity;
        }
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
    onItemsChange(updatedItems);
    calculateTotals(updatedItems);
  };

  const calculateTotals = (currentItems: PricingItem[]) => {
    const itemsSubtotal = currentItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setSubtotal(itemsSubtotal);
    
    const cgstAmount = (itemsSubtotal * cgst) / 100;
    const sgstAmount = (itemsSubtotal * sgst) / 100;
    const discountAmount = (itemsSubtotal * discount) / 100;
    const finalAmount = itemsSubtotal + cgstAmount + sgstAmount - discountAmount;
    
    onTotalChange(finalAmount);
  };

  const handleTaxChange = (type: 'cgst' | 'sgst' | 'discount', value: number) => {
    if (type === 'cgst') setCgst(value);
    if (type === 'sgst') setSgst(value);
    if (type === 'discount') setDiscount(value);
    
    const cgstRate = type === 'cgst' ? value : cgst;
    const sgstRate = type === 'sgst' ? value : sgst;
    const discountRate = type === 'discount' ? value : discount;
    
    const cgstAmount = (subtotal * cgstRate) / 100;
    const sgstAmount = (subtotal * sgstRate) / 100;
    const discountAmount = (subtotal * discountRate) / 100;
    const finalAmount = subtotal + cgstAmount + sgstAmount - discountAmount;
    
    onTotalChange(finalAmount);
  };

  const cgstAmount = (subtotal * cgst) / 100;
  const sgstAmount = (subtotal * sgst) / 100;
  const discountAmount = (subtotal * discount) / 100;
  const finalAmount = subtotal + cgstAmount + sgstAmount - discountAmount;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-600" />
            Pricing Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Sl#</TableHead>
                  <TableHead className="min-w-[200px]">Item Description</TableHead>
                  <TableHead className="w-24">Unit Rate</TableHead>
                  <TableHead className="w-20">UoM</TableHead>
                  <TableHead className="w-24">Quantity</TableHead>
                  <TableHead className="w-24">Total Price</TableHead>
                  <TableHead className="min-w-[150px]">Remarks</TableHead>
                  <TableHead className="w-16">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Enter item description"
                        className="min-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.unitRate || ''}
                        onChange={(e) => updateItem(item.id, 'unitRate', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.uom}
                        onChange={(e) => updateItem(item.id, 'uom', e.target.value)}
                        placeholder="Unit"
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity || ''}
                        onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="w-24 font-semibold">
                        ₹{item.totalPrice.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={item.remarks}
                        onChange={(e) => updateItem(item.id, 'remarks', e.target.value)}
                        placeholder="Add remarks"
                        className="min-w-[150px] min-h-[60px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                        disabled={items.length === 1}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4">
            <Button onClick={addItem} variant="outline" className="text-green-600 hover:text-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Line Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Totals Section */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Subtotal (Without Taxes):</Label>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <Label htmlFor="cgst">CGST (%):</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="cgst"
                    type="number"
                    value={cgst}
                    onChange={(e) => handleTaxChange('cgst', parseFloat(e.target.value) || 0)}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">₹{cgstAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Label htmlFor="sgst">SGST (%):</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="sgst"
                    type="number"
                    value={sgst}
                    onChange={(e) => handleTaxChange('sgst', parseFloat(e.target.value) || 0)}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">₹{sgstAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Label htmlFor="discount">Discount (%):</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="discount"
                    type="number"
                    value={discount}
                    onChange={(e) => handleTaxChange('discount', parseFloat(e.target.value) || 0)}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">-₹{discountAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center bg-white p-6 rounded-lg border-2 border-green-500">
                <Label className="text-lg text-gray-700">Final Amount</Label>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  ₹{finalAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingTable;
