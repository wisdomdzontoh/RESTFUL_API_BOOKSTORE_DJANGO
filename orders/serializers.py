from rest_framework import serializers
from .models import Order, OrderItem
from books.models import Book


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['book', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    # Use a method field to get the related items
    items = OrderItemSerializer(source='orderitem_set', many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'items', 'created_at', 'updated_at']

    def create(self, validated_data):
        items_data = self.context['request'].data.get('items', [])
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
