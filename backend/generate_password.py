from passlib.context import CryptContext

# Create password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_password_hash(password):
    """Generate a secure hash for a password"""
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

if __name__ == "__main__":
    print("🔐 Password Hash Generator")
    print("=" * 40)
    
    # Generate hash for default password
    default_password = "admin123"
    hash_result = generate_password_hash(default_password)
    
    print(f"Password: {default_password}")
    print(f"Hash: {hash_result}")
    print()
    print("Copy this hash to your .env file:")
    print(f"ADMIN_PASSWORD_HASH={hash_result}")
    print()
    
    # Test verification
    test_result = verify_password(default_password, hash_result)
    print(f"Verification test: {'✅ PASS' if test_result else '❌ FAIL'}")
    
    # Generate hash for custom password
    print("\n" + "=" * 40)
    custom_password = input("Enter custom password (or press Enter to skip): ").strip()
    
    if custom_password:
        custom_hash = generate_password_hash(custom_password)
        print(f"\nCustom Password: {custom_password}")
        print(f"Custom Hash: {custom_hash}")
        print(f"ADMIN_PASSWORD_HASH={custom_hash}")
